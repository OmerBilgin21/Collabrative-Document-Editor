// hooks
import { useEffect, useState } from "preact/hooks";
import useAxios from "../../utils/api";

// types
import type { Dispatch } from "preact/hooks";
import type { IDocVersion } from "../../interfaces/docs";

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

    const poleVersions = setInterval(
      () => {
        fetcher();
      },
      60 * 60 * 1000,
    );
    fetcher();
    return () => clearInterval(poleVersions);
  }, [id]);

  return (
    <div className="w-full h-full rounded-l-lg bg-slate-300">
      <ul className="version-list">
        <h1>Versions list:</h1>
        {data.map((version) => {
          if (!version?.created_at) return;
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
