defmodule Alov do
  import MyXQL
  def hello do
    {:ok, result} = query(:myxql, "SELECT * from users")
    IO.puts(result.columns)
    hello()
  end
end
