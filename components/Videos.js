import React from "react";
import ArchiveList from "./ArchiveList";
import userData from "@constants/data";
export default function Videos() { return <ArchiveList eyebrow="Videos" title="Deep dives for curious builders." lede="Recorded explainers on large language models, evaluation, and applied ML." entries={userData.video} action="Watch" aside="More short-form work is available through YouTube and social channels." />; }
