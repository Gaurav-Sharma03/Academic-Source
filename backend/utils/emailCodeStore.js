const codeStore = new Map();

function setCode(email, code) {
  codeStore.set(email, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });
}

function verifyCode(email, inputCode) {
  const entry = codeStore.get(email);
  if (!entry) return false;

  const isExpired = Date.now() > entry.expiresAt;
  const isMatch = entry.code === inputCode;

  return !isExpired && isMatch;
}

function removeCode(email) {
  codeStore.delete(email);
}

module.exports = { setCode, verifyCode, removeCode };
