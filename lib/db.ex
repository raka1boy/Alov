defmodule Db do
  require MyXQL


  def exec(query) do
    MyXQL.query(:myxql, query)
  end
end
