export const track = (event: string, props?: Record<string, unknown>) => {
  // eslint-disable-next-line no-console
  console.log("[Analytics]", event, props);
  // TODO: uncomment when Meta Pixel / GA4 ready:
  // (window as any).fbq?.("trackCustom", event, props);
  // (window as any).gtag?.("event", event, props);
};
