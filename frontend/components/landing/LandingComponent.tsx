'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchJson } from '@/lib/fetcher';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/landing/CampaignCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddCampaign } from '@/components/landing/AddCampaign';
import { CampaignCardSkeleton } from '@/components/landing/CampaignCardSkeleton';
import { useUtils } from '@/providers/Utils.provider';

import { CampaignInterface } from '@/types/campaign.type';
import { setCampaignsReducer } from '@/redux/slices/campaigns.slice';
import NoDataComponent from './NoDataComponent';

export default function LandingComponent() {
  const { campaigns, loading } = useSelector(
    (state: RootState) => state.campaigns,
  );
  const { apiUrl } = useUtils();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setCampaignsReducer({ loading: true }));
        const res = await fetchJson<{ campaigns: CampaignInterface[] }>(
          `${apiUrl}/api/campaigns`,
        );

        dispatch(setCampaignsReducer({ campaigns: res.campaigns }));
      } catch (error) {
        console.log('Error while fetching campaigns:', error);
      }
    })();
  }, []);

  return (
    <div className="relative w-full min-h-dvh">
      <div className="w-full p-8 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center gap-6 pb-4 border-b-2 border-black/5">
          <h1 className="text-4xl font-semibold">Toutes les campages</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer inline-flex items-center gap-1 ps-3">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    fill="currentColor"
                  >
                    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                  </svg>
                </span>
                <span>Ajouter</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nouvelle campagne</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations nécessaires relatifs au
                  nouveau campagne.
                </DialogDescription>
              </DialogHeader>
              <AddCampaign onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full mt-12 flex flex-wrap items-center gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CampaignCardSkeleton key={index} />
            ))
          ) : campaigns.length ? (
            campaigns.map((item) => (
              <Link
                key={`campaign-${item._id}`}
                href={`/campaigns/${item._id}`}
              >
                <CampaignCard data={item} />
              </Link>
            ))
          ) : (
            <NoDataComponent />
          )}
        </div>
      </div>
    </div>
  );
}
