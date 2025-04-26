function Header(props: { id: string }) {
    return (
      <div className="space-y-2">
        <h1 className="text-4xl pb-3 font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Analytics-{props.id}
        </h1>
      </div>
    );
  }
  
  export default async function Profile({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    return (
      <div className="container w-[100%] mx-auto space-y-6">
        <Header id={id} />
      </div>
    );
  }