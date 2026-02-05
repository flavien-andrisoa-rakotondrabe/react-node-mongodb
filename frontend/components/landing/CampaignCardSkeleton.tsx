import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CampaignCardSkeleton() {
  return (
    <Card className="relative w-sm pt-0">
      <div className="w-full h-56 rounded-t-xl">
        <Skeleton className="h-full w-full rounded-t-xl" />
      </div>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">
            <Skeleton className="h-5 w-10 rounded-full" />
          </Badge>
        </CardAction>
        <CardTitle>
          <Skeleton className="h-5 w-25 rounded-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-25 rounded-full" />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-10 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
}
