import React from "react";
import ArchiveList from "./ArchiveList";
import userData from "@constants/data";
export default function Speaking() { return <ArchiveList eyebrow="Speaking" title="Teaching the practical side of AI." lede="Sessions, interviews, and community events focused on automation, AI systems, and technical practice." entries={userData.talks} action="Watch" aside="For an event, session background, or invitation, get in touch by email." />; }
