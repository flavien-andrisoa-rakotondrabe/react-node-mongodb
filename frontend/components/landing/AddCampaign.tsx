'use client';

import Image from 'next/image';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { fetchJson } from '@/lib/fetcher';
import { imageMimeTypes } from '@/lib/constants';
import { useUtils } from '@/providers/Utils.provider';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { addCampaignReducer } from '@/redux/slices/campaigns.slice';

import { CampaignDataInterface } from '@/types/campaign.type';

const formSchema = z
  .object({
    name: z.string().trim().min(1, 'Nom requis'),
    advertiser: z.string().trim().min(1, 'Annonceur requis'),
    budget: z.coerce.number().min(0),
    startDate: z.coerce
      .date({ message: 'Date de début requise' })
      .refine((date) => date !== null, 'Date de début requise'),
    endDate: z.coerce
      .date({ message: 'Date de fin requise' })
      .refine((date) => date !== null, 'Date de fin requise'),
    file: z
      .instanceof(File)
      .refine((file) => imageMimeTypes.includes(file.type), 'Format invalide')
      .optional()
      .nullable(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'La date de fin doit être après la date de début',
    path: ['endDate'],
  });

type FormInput = z.input<typeof formSchema>;

export function AddCampaign({ onClose }: { onClose: () => void }) {
  const { apiUrl } = useUtils();

  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      advertiser: '',
      budget: 0,
      startDate: '',
      endDate: '',
      file: null,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    const data = formSchema.parse(values);

    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('advertiser', data.advertiser);
      formData.append('budget', data.budget.toString());

      formData.append('startDate', data.startDate.toISOString());
      formData.append('endDate', data.endDate.toISOString());

      if (data.file instanceof File) {
        formData.append('file', data.file);
      }

      setIsLoading(true);

      const res = await fetchJson<{
        campaign: CampaignDataInterface;
      }>(`${apiUrl}/api/campaigns`, {
        method: 'POST',
        body: formData,
      });

      if (res.campaign) {
        dispatch(addCampaignReducer({ campaign: res.campaign }));

        toast.success('Campagne créée !');
        form.reset();
        setImageUrl(null);
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
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="name">Nom</Label>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Nom de la campagne"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="advertiser"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="advertiser">Annonceur</Label>
                <Input
                  {...field}
                  id="advertiser"
                  aria-invalid={fieldState.invalid}
                  placeholder="Annonceur"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="budget"
            control={form.control}
            render={({ field: { value, ...fieldProps }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="budget">Budget</Label>
                <div className="w-full flex items-center gap-1">
                  <Input
                    {...fieldProps}
                    id="budget"
                    type="number"
                    value={(value as number) ?? ''}
                    aria-invalid={fieldState.invalid}
                    placeholder="10"
                  />
                  <span>€</span>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="startDate"
            control={form.control}
            render={({ field: { value, ...fieldProps }, fieldState }) => {
              const dateValue =
                value instanceof Date
                  ? value.toISOString().split('T')[0]
                  : ((value as string) ?? '');

              return (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="startDate">Date de début</Label>
                  <Input
                    {...fieldProps}
                    id="startDate"
                    type="date"
                    value={dateValue}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="endDate"
            control={form.control}
            render={({ field: { value, ...fieldProps }, fieldState }) => {
              const dateValue =
                value instanceof Date
                  ? value.toISOString().split('T')[0]
                  : ((value as string) ?? '');

              return (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="endDate">Date de fin</Label>
                  <Input
                    {...fieldProps}
                    id="endDate"
                    type="date"
                    value={dateValue}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="file"
            control={form.control}
            render={({
              field: { value, onChange, ...fieldProps },
              fieldState,
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label
                  htmlFor="file"
                  className="flex flex-col items-start gap-3"
                >
                  <span>Photo d'illustration</span>
                  <span
                    className={cn(
                      'w-full h-32 flex justify-center items-center rounded-xl cursor-pointer',
                      imageUrl ? '' : 'border border-black border-dashed',
                    )}
                  >
                    <Input
                      {...fieldProps}
                      id="file"
                      type="file"
                      accept=".jpeg, .jpg, .png, .webp, .svg, .jfif, .heif"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file || null);

                        if (file) {
                          const url = URL.createObjectURL(file);
                          setImageUrl(url);
                        } else {
                          setImageUrl(null);
                        }
                      }}
                      aria-invalid={fieldState.invalid}
                      className="hidden"
                    />
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Image"
                        width={300}
                        height={80}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="flex w-10 h-10 text-black/35 hover:text-black/50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 640"
                          fill="currentColor"
                        >
                          <path d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256C206.3 256 192 241.7 192 224C192 206.3 206.3 192 224 192zM360 264C368.5 264 376.4 268.5 380.7 275.8L460.7 411.8C465.1 419.2 465.1 428.4 460.8 435.9C456.5 443.4 448.6 448 440 448L200 448C191.1 448 182.8 443 178.7 435.1C174.6 427.2 175.2 417.6 180.3 410.3L236.3 330.3C240.8 323.9 248.1 320.1 256 320.1C263.9 320.1 271.2 323.9 275.7 330.3L292.9 354.9L339.4 275.9C343.7 268.6 351.6 264.1 360.1 264.1z" />
                        </svg>
                      </span>
                    )}
                  </span>
                </Label>
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
          <span>Créer</span>
        </Button>
      </div>
    </form>
  );
}
