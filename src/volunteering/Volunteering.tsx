import { volunteerJobs } from "../util/static";

type VolunteeringProps = {
  volunteerSectionRef: (node?: Element | null) => void;
};

const Volunteering = ({ volunteerSectionRef }: VolunteeringProps) => {
  return (
    <section ref={volunteerSectionRef}>
      {/* Gradient divider */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #e0d9d0, transparent)' }} />

      <div className="mx-auto max-w-5xl px-8 py-20 scroll-mt-24" id="otherexperience">
        {/* D1-style section label */}
        <p className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-[#e76f51] mb-3">
          03 — Community
        </p>
        <h1 className="md:text-6xl sm:text-4xl text-4xl font-bold mb-12 text-[#1a1a1a]">
          Community
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {volunteerJobs.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm"
              style={{ borderLeft: `4px solid ${item.accentColor}` }}
            >
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">
                {item.orgName}
              </h3>
              <p
                className="text-[0.74rem] font-bold tracking-[0.12em] uppercase mb-3"
                style={{ color: item.accentColor }}
              >
                {item.role}
              </p>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;
