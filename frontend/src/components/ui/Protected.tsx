import { useNavigate } from "react-router-dom";
import { getToken } from "./session";
import { ReactElement, useEffect } from "react";

const Protected = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const authenticate = getToken("token");
  useEffect(() => {
    if (!authenticate) {
      navigate("/");
    }
  }, [authenticate, navigate]);

  if (!authenticate) {
    return null;
  }
  return <div>{children}</div>;
};

export default Protected;
