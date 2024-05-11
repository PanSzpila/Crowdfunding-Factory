import { useMemo } from "react";
import { useRouter } from "next/router";

export function useContractNo() {
  const router = useRouter();

  return useMemo(() => {
    let contractNoFromPath = router.asPath.split("/").pop();
    if (router.isReady && router.query.contractNo) {
      contractNoFromPath = String(router.query.contractNo);
    }
    return contractNoFromPath;
  }, [router.asPath, router.query.contractNo, router.isReady]);
}
