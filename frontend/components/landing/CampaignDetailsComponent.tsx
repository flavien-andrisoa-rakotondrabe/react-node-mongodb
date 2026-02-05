'use client';

import Link from 'next/link';
import Image from 'next/image';
import NoDataComponent from '@/components/landing/NoDataComponent';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchJson } from '@/lib/fetcher';
import { useUtils } from '@/providers/Utils.provider';
import {
  setActualCampaignReducer,
  setCampaignsReducer,
} from '@/redux/slices/campaigns.slice';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CampaignCardSkeleton } from '@/components/landing/CampaignCardSkeleton';

import { CampaignDataInterface } from '@/types/campaign.type';
import { UpdateCampaign } from './UpdateCampaign';

export default function CampaignDetailsComponent({
  campaignId,
}: {
  campaignId: string;
}) {
  const { actualCampaign, loading } = useSelector(
    (state: RootState) => state.campaigns,
  );
  const { apiUrl } = useUtils();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (campaignId) {
      (async () => {
        try {
          dispatch(setCampaignsReducer({ loading: true }));

          const res = await fetchJson<{ campaign: CampaignDataInterface }>(
            `${apiUrl}/api/campaigns/${campaignId}`,
          );

          dispatch(setActualCampaignReducer({ campaign: res.campaign }));
        } catch (error) {
          console.log('Error while fetching campaign');
        }
      })();
    }
  }, [campaignId]);

  return (
    <div className="relative w-full min-h-dvh">
      <div className="w-full p-8 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center gap-6 pb-4 border-b-2 border-black/5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black cursor-pointer ps-2 pe-4 py-2 rounded-md hover:opacity-90 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
            </svg>
            <span>Retour</span>
          </Link>
        </div>

        <div className="w-full mt-12">
          {loading ? (
            <div className="w-full min-h-dvh">
              <CampaignCardSkeleton />
            </div>
          ) : !actualCampaign ? (
            <NoDataComponent />
          ) : (
            <Card className="relative w-sm pt-0">
              <div className="w-full h-56 rounded-t-xl">
                <Image
                  src={
                    actualCampaign
                      ? actualCampaign.files[0].url
                      : '/campaign.png'
                  }
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
                      actualCampaign.status === 'active'
                        ? 'bg-green-200'
                        : actualCampaign.status === 'paused'
                          ? 'bg-yellow-200'
                          : 'bg-red-200',
                    )}
                  >
                    {actualCampaign.status}
                  </Badge>
                </CardAction>
                <CardTitle>{actualCampaign.name}</CardTitle>
                <CardDescription>{actualCampaign.advertiser}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full cursor-pointer">
                      Mettre à jour
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Nouvelle campagne</DialogTitle>
                      <DialogDescription>
                        Veuillez remplir les informations nécessaires relatifs
                        au nouveau campagne.
                      </DialogDescription>
                    </DialogHeader>
                    <UpdateCampaign
                      campaign={actualCampaign}
                      onClose={() => setOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
