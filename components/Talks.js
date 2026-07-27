import React from "react";
import ArchiveList from "./ArchiveList";
import userData from "@constants/data";
export default function Talks() { return <ArchiveList eyebrow="Talks" title="Selected public appearances." lede="A focused list of recorded talks and interviews on AI and automation." entries={userData.talks} action="Watch" />; }
