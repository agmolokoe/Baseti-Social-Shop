
import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { ProductShareButton } from "./ProductShareButton"
import { Product } from "@/lib/supabase/types"

type ProductListProps = {
  products: Product[]
  isLoading: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export const ProductList = memo(function ProductList({ 
  products, 
  isLoading, 
  onEdit, 
  onDelete 
}: ProductListProps) {
  
  const handleEdit = useCallback((product: Product) => {
    onEdit(product)
  }, [onEdit])
  
  const handleDelete = useCallback((id: number) => {
    onDelete(id)
  }, [onDelete])

  return (
    <div className="rounded-md border border-[#FFFFFF]/10">
      <Table>
        <TableHeader>
          <TableRow className="border-[#FFFFFF]/10">
            <TableHead className="text-[#FFFFFF] w-[100px]">Image</TableHead>
            <TableHead className="text-[#FFFFFF]">Name</TableHead>
            <TableHead className="text-[#FFFFFF]">Description</TableHead>
            <TableHead className="text-[#FFFFFF]">Cost Price</TableHead>
            <TableHead className="text-[#FFFFFF]">Selling Price</TableHead>
            <TableHead className="text-[#FFFFFF]">Profit</TableHead>
            <TableHead className="text-[#FFFFFF]">Stock</TableHead>
            <TableHead className="text-right text-[#FFFFFF]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-[#FFFFFF]">
                Loading...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-[#FFFFFF]">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const cost = product.cost_price || 0;
              const selling = product.selling_price || 0;
              const profit = selling - cost;
              return (
                <TableRow key={product.id} className="border-[#FFFFFF]/10">
                  <TableCell>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-[#FFFFFF]/5 rounded-md flex items-center justify-center">
                        <span className="text-[#FFFFFF]/40 text-xs">No image</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-[#FFFFFF]">{product.name}</TableCell>
                  <TableCell className="text-[#FFFFFF]">{product.description}</TableCell>
                  <TableCell className="text-[#FFFFFF]">{formatCurrency(cost)}</TableCell>
                  <TableCell className="text-[#FFFFFF]">{formatCurrency(selling)}</TableCell>
                  <TableCell className={`${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatCurrency(profit)}
                  </TableCell>
                  <TableCell className="text-[#FFFFFF]">{product.stock}</TableCell>
                  <TableCell className="text-right flex items-center justify-end space-x-1">
                    <ProductShareButton product={product} />
                    <Button
                      variant="ghost"
                      onClick={() => handleEdit(product)}
                      className="text-[#25F4EE] hover:text-[#25F4EE]/90 hover:bg-[#FFFFFF]/5"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(product.id)}
                      className="text-[#FE2C55] hover:text-[#FE2C55]/90 hover:bg-[#FFFFFF]/5"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
})
