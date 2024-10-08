import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export function AuthForm({ type }: { type: string }) {
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleData = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/${type}`,
      postInputs
    );
    console.log(response.data.token);

    sessionStorage.setItem("token", response.data.token);
  };

  return (
    <div className="grid grid-cols-2 overflow-y-hidden">
      <div className="h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-start ">{type}</CardTitle>
            <CardDescription className="text-start">
              {type === "signup"
                ? `Already have an account `
                : `Didn't have an account `}
              <Link
                to={type == "signup" ? "/login" : "/signup"}
                className="underline"
              >
                {type == "signup" ? "Login" : "signup"}
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {type === "signup" ? (
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-semibold">
                  name
                </Label>
                <Input
                  onChange={(e) =>
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    })
                  }
                  id="name"
                  type="text"
                  placeholder="manikanta"
                  required
                />
              </div>
            ) : null}
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <Input
                onChange={(e) =>
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  })
                }
                id="email"
                type="email"
                placeholder="mani@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="font-semibold">
                Password
              </Label>
              <Input
                onChange={(e) =>
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  })
                }
                id="password"
                placeholder="123456"
                type="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleData} className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="bg-gray-300"></div>
    </div>
  );
}
