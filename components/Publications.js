import React from "react";
import ArchiveList from "./ArchiveList";
import userData from "@constants/data";
const entries = [{ title: "Applying deep bidirectional LSTM and mixture density network for basketball trajectory prediction", source: "Optik", date: "2018", link: userData.GoogleSUrl }, { title: "Applying deep learning to basketball trajectories", source: "arXiv", date: "2016", link: "https://arxiv.org/abs/1608.03793" }, { title: "Expert-augmented automated machine learning optimizes hemodynamic predictors of spinal cord injury outcome", source: "PLOS ONE", date: "2022", link: "https://pubmed.ncbi.nlm.nih.gov/35390006/" }];
export default function Publications() { return <ArchiveList eyebrow="Publications" title="Research and long-form technical work." lede="A selected record of academic and technical publications, with links to source platforms and profiles." entries={entries} action="Read" aside="For the full research record, visit SSRN or Google Scholar." />; }
