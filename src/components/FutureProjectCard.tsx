const FutureProjectCard = ({ index }: { index: number }) => {
  return (
    <div className="future-card group">
      <div className="h-24 rounded-xl bg-gradient-to-br from-secondary/60 to-secondary/20 animate-pulse-slow" />
      <div className="mt-4 space-y-2">
        <div className="w-2/3 h-4 rounded bg-secondary/40 blur-[2px]" />
        <div className="w-5/6 h-3 rounded bg-secondary/30 blur-[2px]" />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Coming soon</p>
    </div>
  );
};

export default FutureProjectCard;
