import Link from "next/link";
import userData from "@constants/data";

export default function ContributionBrands() {
  const { contributions } = userData;
  return <ul className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6" aria-label="Organizations and projects with recorded contributions">
    {contributions.brands.map((brand) => {
      const projects = contributions.projects.filter((project) => brand.repos.includes(project.repo));
      const merged = projects.reduce((sum, project) => sum + project.merged.length, 0);
      const open = projects.reduce((sum, project) => sum + project.open.length, 0);
      const status = merged ? `${merged} merged` : `${open} open proposals`;
      return <li key={brand.name}>
        <Link href={`/open-source#${brand.repos[0].replace("/", "-")}`} aria-label={`${brand.name}: ${status}. View recorded pull requests.`} className="group flex h-full flex-col items-center text-center">
          <span className="flex h-11 w-14 items-center justify-center rounded-lg bg-white p-1.5 ring-1 ring-[#c7cfca] transition group-hover:ring-[#91aed2]">
            <img src={brand.logo} alt="" width="40" height="32" className="h-8 w-10 object-contain" />
          </span>
          <span className="mt-2 whitespace-nowrap text-[11px] font-semibold">{brand.name}</span>
          <span className="mt-0.5 text-[10px] opacity-80">{status}</span>
        </Link>
      </li>;
    })}
  </ul>;
}
