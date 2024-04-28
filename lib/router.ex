defmodule Alov.Router do
  use Plug.Router
  require Product
  require Jason
  plug :match
  plug :dispatch

  get "/" do
    send_resp(conn, :ok, "hi dsadsad")
  end

  get "/hello/:name" do
    send_resp(conn, 200, "hello #{name}")
  end

  get "/product/get/:id" do
    send_resp(conn, 200, Product.get(id) |> Product.jsonify)
  end
end
