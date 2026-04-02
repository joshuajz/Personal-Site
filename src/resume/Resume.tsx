import { jobs } from "../util/static";

type ResumeProps = {
  expereinceSectionRef: (node?: Element | null) => void;
};

const Resume = ({ expereinceSectionRef }: ResumeProps) => {
  return (
    <section ref={expereinceSectionRef}>
      {/* Gradient divider */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #e0d9d0, transparent)' }} />

      <div className="mx-auto max-w-5xl px-8 py-20 scroll-mt-24" id="technical">
        {/* D1-style section label */}
        <p className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-[#e76f51] mb-3">
          01 — Career
        </p>
        <h1 className="md:text-6xl sm:text-4xl text-4xl font-bold mb-12 text-[#1a1a1a]">
          Technical Experience
        </h1>

        {/* D1 gradient timeline */}
        <div className="relative ml-2">
          {/* Vertical gradient line */}
          <div
            className="absolute left-0 top-2 bottom-4 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #0A6847, #e8cead)' }}
          />

          {jobs.map((job, i) => (
            <div key={i} className="relative pl-10 pb-12 last:pb-0">
              {/* Green dot marker */}
              <div
                className="absolute left-[-5px] top-[10px] w-[11px] h-[11px] rounded-full z-10"
                style={{ background: '#0A6847', border: '2px solid #faf6f0' }}
              />

              {/* White card */}
              <div
                className="bg-white rounded-2xl p-6 shadow-sm"
                style={{ border: '1px solid #e8cead' }}
              >
                <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#0A6847] mb-0.5">
                  {job.companyName}
                </p>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-[#999] font-medium mb-4">
                  {job.timeline}
                </p>
                {job.description && (
                  <ul className="list-disc pl-5 space-y-1.5 text-[#555] text-sm leading-relaxed mb-4">
                    {job.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                )}
                {job.techGridList && (
                  <div className="flex flex-wrap gap-2">
                    {job.techGridList.map((tech, j) => (
                      <span
                        key={j}
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          background: '#f1dec6',
                          color: '#0A6847',
                          border: '1px solid #e8cead',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
