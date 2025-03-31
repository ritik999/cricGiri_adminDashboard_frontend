import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchFunction";
import { Table } from "flowbite-react";

const Teams = () => {
  const [teamCode, setTeamCode] = useState("");
  const [teamData, setTeamData] = useState(null);
  const [playerList, setPlayerList] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamId, setTeamId] = useState(null);
  const [playerListError, setPlayerListError] = useState("");

  const handleSearchCodeChange = async (e) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (isNaN(numValue) || value.trim() === "") {
      setIsValid(false);
      //   console.log(isValid);
      return;
    } else {
      setIsValid(true);
      setTeamCode(numValue);
    }
  };

  useEffect(() => {
    if (teamCode == "") setIsValid(true);
  }, [teamCode]);

  const searchTeamData = useMutation({
    mutationFn: () =>
      fetchData(
        "/admin/team/by-team-code",
        "POST",
        { team_code: teamCode },
        import.meta.env?.VITE_TOKEN
      ),
    onSuccess: (data) => {
      if (data.hasOwnProperty("status") && data.status == 0) {
        setPlayerList([]);
        setPlayerListError("");
        setTeamData(null);
        setTeamId(null);
        setErrorMessage(`Team with code "${teamCode}" not found.`);
      } else {
        setTeamData(data);
        setTeamId(data.id);
        searchPlayerData.mutate({ team_id: data.id });
      }
    },
    onError: (error) => {
      console.error("Error fetching data: ", error);
    },
  });

  const searchPlayerData = useMutation({
    mutationFn: ({ team_id }) =>
      fetchData(
        "/admin/team/player-list",
        "POST",
        { team_id },
        import.meta.env?.VITE_TOKEN
      ),
    onSuccess: (data) => {
      console.log(data);
      if (data.hasOwnProperty("status") && data.status == 0) {
        setPlayerList([]);
        setPlayerListError(`No players in this Team`);
      } else {
        setPlayerListError("");
        setPlayerList(data);
      }
    },
    onError: (error) => {
      console.error("Error fetching players list data: ", error);
    },
  });

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="team_code" className="font-bold font-mono ">
          Search Team
        </label>
        <input
          name="team_code"
          type="text"
          value={teamCode}
          onChange={(e) => {
            handleSearchCodeChange(e);
            setTeamCode(e.target.value.replace(/\s/g, ""));
          }}
          onKeyDown={(e) => e.key === " " && e.preventDefault()}
          maxLength={10}
          placeholder="Enter Team Code"
          className="border p-2 rounded w-64"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => searchTeamData.mutate()}
          className={`${
            teamCode == "" || !isValid ? `bg-slate-500` : `bg-blue-500`
          } text-white p-2 rounded mt-2 `}
          disabled={!teamCode || !isValid}
        >
          Search Team
        </button>
        <button
          onClick={() => {
            setTeamCode("");
            setTeamData(null);
            setErrorMessage("");
            setIsValid(true);
            setPlayerList([]);
            setPlayerListError("");
          }}
          className="bg-red-500 text-white p-2 rounded mt-2"
        >
          Clear
        </button>
      </div>
      {!isValid && (
        <h1 className="text-center text-red-500 font-bold">
          Invalid Team Code (E.g. For Team ID like : 'RED123456', the Team Code
          is '123456')
        </h1>
      )}

      {searchTeamData.isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : searchTeamData.isError ? (
        <h1 className="text-center text-red-500 font-bold">
          Error Fetching Team Try again
        </h1>
      ) : teamData === null ? (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      ) : (
        <>
          <div className="mt-5 p-4 border rounded flex  justify-between ">
            <div className="font-mono flex flex-col gap-5">
              <h2 className="font-bold text-cyan-700">Team Information</h2>
              <p className="capitallize">
                <strong>Name:</strong> {teamData?.name || ""}
              </p>
              <p className="capitallize">
                <strong>City:</strong> {teamData?.cityName || ""}
              </p>
            </div>

            <div className="mt-3 flex flex-col text-center">
              <img
                src={`${import.meta.env?.VITE_BASE_URL}${teamData?.Image}`}
                alt={`TeamImage`}
                className="w-44 h-44 rounded-md border"
              />
              <h4>Logo</h4>
            </div>
          </div>
          <div name="player_list" className="w-full flex justify-center mt-5">
            {playerListError && (
              <p className="text-gray-700 mt-2">{playerListError}</p>
            )}
            {playerList.length > 0 && (
              <Table
                className="overflow-x-scroll max-h-50 no-scrollbar border-4 text-center w-[800px]"
                striped
              >
                <Table.Head>
                  <Table.HeadCell>S.No.</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {playerList?.map((player, index) => (
                    <Table.Row key={player.playerId} className="bg-white">
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell className="font-medium">
                        {player.name.toUpperCase()}
                        {` `}
                      </Table.Cell>
                      <Table.Cell>
                        {player.isWicketkeeper === "1" && "Wicket Keeper"}{" "}
                        {player.isCaptain === "1" && "Captain"}
                        {player.isCaptain === "0" &&
                          player.isWicketkeeper === "0" &&
                          "-"}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Teams;
