import Image from 'next/image';

import { cn } from '@/lib/utils';
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

import { CampaignDataInterface } from '@/types/campaign.type';

export function CampaignCard({ data }: { data: CampaignDataInterface }) {
  return (
    <Card className="relative w-sm pt-0">
      <div className="w-full h-56 rounded-t-xl">
        <Image
          src={data.files.length ? data.files[0].url : '/campaign.png'}
          alt="Event cover"
          width={382}
          height={224}
          className="w-full h-full aspect-video object-cover rounded-t-xl"
        />
      </div>
      <CardHeader>
        <CardAction>
          <Badge
            variant="secondary"
            className={cn(
              data.status === 'active'
                ? 'bg-green-200'
                : data.status === 'paused'
                  ? 'bg-yellow-200'
                  : 'bg-red-200',
            )}
          >
            {data.status}
          </Badge>
        </CardAction>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.advertiser}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full cursor-pointer">Voir les détails</Button>
      </CardFooter>
    </Card>
  );
}
