defmodule Alov.Application do
  use Application
  @impl true
  def start(_type, _args) do
    children = [
      {MyXQL, username: "root", name: :myxql, database: "alov_dev" ,protocol: :tcp}
     ]

    opts = [strategy: :one_for_one, name: Alov.Supervisor]
    Supervisor.start_link(children, opts)
    Alov.hello
  end
end
