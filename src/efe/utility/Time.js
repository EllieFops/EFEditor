// Namespace: efe.utility
if (!efe) {var efe={}}
if (!efe.utility) {efe.utility={}}

efe.utility.Time = (
  function ()
  {
    function microtime(g)
    {
      return new Date().getTime() / 1000;
    }

    return {};
  }
)();
