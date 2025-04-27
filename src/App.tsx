"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  CircleCheckIcon,
  EyeIcon,
  EyeOffIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/ui/loading";
import { toast } from "sonner";

export default function App() {
  const [showToken, setShowToken] = useState(false);

  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState("");
  const [auth, setAuth] = useState("");
  const [token, setToken] = useState("");
  const [payload, setPayload] = useState("");

  const { data, isError, mutate, isPending, error } = useMutation({
    mutationKey: ["requestApi"],
    mutationFn: async (method: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestBody: any = {
        method,
        url,
        token,
      };

      if (method === "POST" || method === "PUT") {
        requestBody.payload = JSON.parse(payload.trim());
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_PROXY_API}/proxy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error("Error", {
          description: "Request failed.",
          style: {
            backgroundColor: "bg-red-500",
          },
        });
        return data;
      }

      toast.success("Success", {
        description: "Request completed successfully!",
        icon: <CircleCheckIcon />,
      });
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (isError) {
    console.log(error);
    return;
  }

  return (
    <>
      <Header />
      <main className="w-full flex flex-col container mx-auto">
        <Card className="my-8 w-full rounded p-4">
          <Tabs defaultValue="auth" className="flex-1">
            <TabsList>
              {/* <TabsTrigger value="params">Params</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger> */}
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>
            {/* <TabsContent value="params" className="flex-1 mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-[1fr_2fr] gap-4">
                    <div>
                      <Label htmlFor="key">Key</Label>
                      <Input id="key" placeholder="Parameter name" />
                    </div>
                    <div>
                      <Label htmlFor="value">Value</Label>
                      <Input id="value" placeholder="Parameter value" />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Parameter
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="headers" className="flex-1 mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-[1fr_2fr] gap-4">
                    <div>
                      <Label htmlFor="header-key">Key</Label>
                      <Input
                        id="header-key"
                        placeholder="Header name"
                        defaultValue="Content-Type"
                      />
                    </div>
                    <div>
                      <Label htmlFor="header-value">Value</Label>
                      <Input
                        id="header-value"
                        placeholder="Header value"
                        defaultValue="application/json"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Header
                  </Button>
                </CardContent>
              </Card>
            </TabsContent> */}
            <TabsContent value="body" className="flex-1 mt-4">
              <Card className="rounded gap-2">
                <CardHeader>
                  <CardTitle className="font-bold">Payload</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Request Body (JSON Format)"
                    className="min-h-[200px] font-mono resize-none"
                    onChange={(e) => setPayload(e.target.value)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="auth" className="flex-1 mt-4">
              <Card className="rounded gap-2">
                <CardHeader>
                  <CardTitle className="font-bold">Authorization</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select defaultValue="none" onValueChange={setAuth}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Auth Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Auth</SelectItem>
                      <SelectItem value="Bearer">Bearer Token</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="mt-4">
                    <div className="relative">
                      <Input
                        id="password"
                        type={showToken ? "text" : "password"}
                        placeholder="Bearer token"
                        className="pr-10"
                        disabled={!auth}
                        onChange={(e) => setToken(e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="absolute bottom-1 right-1 h-7 w-7"
                        onClick={() => setShowToken(!showToken)}
                      >
                        {showToken ? (
                          <EyeIcon className="h-4 w-4" />
                        ) : (
                          <EyeOffIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="w-full border p-4 rounded shadow">
          <div>
            <h3 className="font-bold text-xl mb-4">Request</h3>
            <div className="flex items-center gap-4">
              <Select defaultValue="GET" onValueChange={setMethod}>
                <SelectTrigger className="max-w-24 w-full">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                className="flex-1"
                placeholder="Enter url here"
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => {
                  mutate(method);
                }}
                disabled={!url || isPending!}
              >
                {isPending ? "Sending..." : "Send"}
                <SendHorizontalIcon size={18} />
              </Button>
            </div>
          </div>

          <Separator className="my-12" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">Response</h3>
              {data && (
                <div className="flex items-center gap-2">
                  <Badge className={`${!data.success && "bg-red-500"}`}>
                    {data.success ? "success" : "error"}
                  </Badge>
                  <Badge className={`${!data.success && "bg-red-500"}`}>
                    {data.status_code}
                  </Badge>
                  <Badge>{method}</Badge>
                </div>
              )}
            </div>
            {isPending && <Loading />}
            {data && (
              <Card className="max-h-80 w-full h-full overflow-auto">
                <CardContent className="p-4">
                  <pre className="text-sm w-full">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </Card>
      </main>
    </>
  );
}
