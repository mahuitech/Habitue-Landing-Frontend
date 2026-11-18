import Image from "next/image";

export function PoweredBy() {
  return <footer className="powered-by"><span>Powered by</span><span className="habitue-wordmark"><Image src="/brand/habitue.png" alt="habitué" width={2000} height={2000} /></span></footer>;
}
