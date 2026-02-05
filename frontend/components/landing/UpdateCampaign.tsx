'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchJson } from '@/lib/fetcher';
import { campaignStatus } from '@/lib/constants';
import { useUtils } from '@/providers/Utils.provider';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { updateActualCampaignReducer } from '@/redux/slices/campaigns.slice';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CampaignDataInterface } from '@/types/campaign.type';

const formSchema = z.object({
  status: z.string(),
});

type FormInput = z.input<typeof formSchema>;

export function UpdateCampaign({
  campaign,
  onClose,
}: {
  campaign: CampaignDataInterface;
  onClose: () => void;
}) {
  const { apiUrl } = useUtils();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: campaign.status,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    const data = formSchema.parse(values);

    if (campaign.status === data.status) return;

    try {
      setIsLoading(true);

      const res = await fetchJson<{
        campaign: Partial<CampaignDataInterface>;
      }>(`${apiUrl}/api/campaigns/${campaign._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: data.status }),
      });

      if (res.campaign) {
        dispatch(updateActualCampaignReducer({ campaign: res.campaign }));

        toast.success('Statut mis à jour !');
        form.reset();
        onClose();
      } else {
        toast.error("Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      toast.error('Impossible de contacter le serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="max-h-[50dvh] overflow-y-auto p-2">
        <FieldGroup className="gap-5">
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="status">Statut</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignStatus.map((item) => (
                      <SelectItem
                        key={`status-${item.value}`}
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer mt-6 disabled:opacity-80 disabled:cursor-default"
        >
          {isLoading && <Spinner />}
          <span>Mettre à jour</span>
        </Button>
      </div>
    </form>
  );
}
