export function canPKFollowTargetPK(currentPublicKey, targetPublicKey) {
    if (!currentPublicKey || !targetPublicKey) {
      return false;
    }

    // current can follow target as long as current != target
    return currentPublicKey != targetPublicKey;
}