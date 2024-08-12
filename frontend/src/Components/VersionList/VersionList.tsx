import { Dispatch, useEffect, useState } from "preact/hooks";
import useAxios from "../../utils/api";
import { IDocVersion } from "../../interfaces/docs";

interface IProps {
  id: number;
  setText: Dispatch<string>;
}

const VersionList = ({ setText, id }: IProps) => {
  const [data, setData] = useState<IDocVersion[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const versions = await useAxios(`/version/${id}`, "get");
      if (versions.length > 0) {
        setData(versions);
      }
    };

    // for updating along the way
    const poleVersions = setInterval(() => {
      fetcher();
    }, 20 * 1000);

    // for initial load
    fetcher();

    return () => clearInterval(poleVersions);
  }, [id]);

  if (data.length === 0) {
    return <></>;
  }

  return (
    <div className="w-full h-full">
      <ul className="version-list">
        <h1>Versions list:</h1>
        {data.map((version) => {
          const textArr = version.created_at.split("T");
          const readable = textArr[0].concat(
            " at ",
            textArr[1].split(":")[0],
            ":",
            textArr[1].split(":")[1],
          );
          return (
            <li
              className="version-list-item text-xs cursor-pointer"
              onClick={() => setText(version.text)}
            >
              <p className="nice-text">{readable}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VersionList;
