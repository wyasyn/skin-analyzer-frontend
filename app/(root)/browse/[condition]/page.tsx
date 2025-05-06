import { Card, CardContent } from "@/components/ui/card";
import { getConditionInfo } from "@/data/getConditionInfo";

type Params = Promise<{ condition: string }>;
export default async function ConditionPage(props: { params: Params }) {
  const params = await props.params;
  const condition = params.condition;
  if (!condition) {
    return (
      <div className="wrapper mt-8 text-muted-foreground">
        Condition not found
      </div>
    );
  }
  const conditionInfo = getConditionInfo(condition);
  if (!conditionInfo) {
    return (
      <div className="wrapper mt-8 text-muted-foreground">
        Condition not found
      </div>
    );
  }
  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold mb-4">
        {conditionInfo.condition} ({conditionInfo.recommended_products.length})
      </h1>
      <p className="text-muted-foreground mb-8 max-w-prose">
        {conditionInfo.description}
      </p>
      <h2 className="text-lg font-medium mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {conditionInfo.recommended_products.map((product) => {
          return (
            <a
              key={product.image}
              href={product.link}
              target="_blank"
              rel="noreferrer"
            >
              <Card className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder-image.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium line-clamp-1">{product.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
