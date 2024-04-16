
defmodule User do
  @moduledoc """
  Модуль для работы с юзерами
  """

  require Db
  defstruct name: nil, password: nil, email: nil

  #@spec create(User) :: nil
  def delete(user) do
    Db.exec(
      "#{user}"
    )

  end

  def exsists(name) do
    {_, result} = Db.exec("SELECT id FROM users WHERE username = '#{name}'")
    result.num_rows != 0
  end
end
