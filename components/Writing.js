import React from "react";
import ArchiveList from "./ArchiveList";
import userData from "@constants/data";
export default function Writing() { return <ArchiveList eyebrow="Writing" title="Technical writing, clearly explained." lede="Articles on machine learning, AI systems, and the practical details that determine whether an idea works." entries={userData.blogpost} action="Read" aside="Published across technical communities and platforms." />; }
