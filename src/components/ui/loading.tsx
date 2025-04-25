export function Loading() {
  return (
    <div className="flex flex-col items-center gap-2 p-8">
      <div className="size-12 border-2 border-black border-t-zinc-50 rounded-full animate-spin" />
      <span className="font-semibold">Carregando...</span>
    </div>
  );
}
