defmodule Alov.Application do
  use Application
  @impl true
  def start(_type, _args) do
    children = [
      {MyXQL, username: "root", name: :myxql, database: "alov_dev" ,protocol: :tcp},
      {Plug.Adapters.Cowboy, scheme: :http, plug: Alov.Router, options: [ port: 4040 ]}
     ]

    opts = [strategy: :one_for_one, name: Alov.Supervisor]
    res = Supervisor.start_link(children, opts)
    Alov.hello
    res
  end
end
