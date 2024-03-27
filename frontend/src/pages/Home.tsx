import {useEffect, useState} from "react";
import {API_URL} from "../contants/api_url";
import {Link} from "react-router-dom";

interface OrganizationData {
  id: number;
  name: string;
  type: "perishable" | "non-perishable";
  description: string;
}

export default function Home() {
  const [organization, setOrganization] = useState<OrganizationData[]>([]);

  async function getOrganization() {
    try {
      const response = await fetch(`${API_URL}/api`);
      const data = await response.json();
      setOrganization(data.response);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getOrganization();
  }, []);

  if (!organization) {
    return <div>No Organisation Found</div>;
  }

  return (
    <div className="p-4">
      <h1>All Organisation</h1>
      <section className="p-4 h-full space-y-2 w-full">
        {organization?.map((org) => (
          <div
            className="flex gap-2 border-[1px] rounded-md p-10 flex-col w-[549px]"
            key={org.id}
          >
            <h2 className="uppercase font-bold w-full">{org.name}</h2>
            <div>
              <p className="capitalize italic">Type: {org.type}</p>
              <p className="capitalize italic">
                Description: {org.description}
              </p>
              <Link to={org.id.toString()}>Book Now</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
