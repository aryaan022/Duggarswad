export const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">2</div>
            <p className="text-muted-foreground font-medium">Traditional Recipes</p>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">3</div>
            <p className="text-muted-foreground font-medium">Contributors</p>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">0</div>
            <p className="text-muted-foreground font-medium">Recipes Shared Today</p>
          </div>
        </div>
      </div>
    </section>
  );
};