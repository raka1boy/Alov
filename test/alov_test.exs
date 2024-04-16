defmodule AlovTest do
  use ExUnit.Case
  doctest Alov

  test "greets the world" do
    assert Alov.hello() == :world
  end
end
