import CampaignDetailsComponent from '@/components/landing/CampaignDetailsComponent';

export default async function CampaignDetailsPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return <CampaignDetailsComponent campaignId={campaignId} />;
}
