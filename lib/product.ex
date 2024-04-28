defmodule Product do
  require Db
  defstruct id: nil,
  name: nil,
  category: nil,
  price: nil,
  date_added: nil,
  ordered_amount: nil,
  ordered_amount_per_month: nil,
  image_link: nil

  def exists?(name) do
    Db.exec("SELECT id FROM product WHERE name = #{name}")
  end

  def get(id) do
    result = Db.exec("SELECT * FROM product WHERE id = #{id}") |> elem(1)
    data = result.rows |> Enum.at(0)
    %Product{
      id: data |> Enum.at(0),
      name: data |> Enum.at(1),
      category: data |> Enum.at(2),
      price: data |> Enum.at(3),
      date_added: data |> Enum.at(4),
      ordered_amount: data |> Enum.at(5),
      ordered_amount_per_month: data |> Enum.at(6),
      image_link: data |> Enum.at(7)
    }
  end

  def jsonify(product) do
    """
    "product":{
      "id": #{product.id},
      "name": #{product.name},
      "category": #{product.category},
      "price": #{product.price},
      "date_added": #{product.date_added},
      "ordered_amount": #{product.ordered_amount},
      "ordered_amount_per_month": #{product.ordered_amount_per_month},
      "image_link": #{product.image_link}
    }
    """
  end
end
