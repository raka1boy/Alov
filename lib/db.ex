defmodule Db do
  require MyXQL

  @spec exec(
          binary()
          | maybe_improper_list(
              binary() | maybe_improper_list(any(), binary() | []) | byte(),
              binary() | []
            )
        ) ::
          {:error, %{:__exception__ => true, :__struct__ => atom(), optional(atom()) => any()}}
          | {:ok, MyXQL.Result.t()}
  def exec(query) do
    MyXQL.query(:myxql, query)
  end
end
