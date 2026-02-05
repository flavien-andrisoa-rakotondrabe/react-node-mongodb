import Image from 'next/image';

export default function NoDataComponent() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-100 h-100 rounded-2xl">
          <Image
            src="/empty.jpg"
            alt="Empty"
            width={400}
            height={400}
            className="w-full h-full rounded-2xl"
          />
        </div>
        <p className="text-4xl text-black/35 font-semibold">Aucune donnée</p>
      </div>
    </div>
  );
}
