<svelte:options runes={false} />

<script lang="ts">
  import { copy } from "$lib/i18n";
  import { language } from "$lib/preferences";

  $: t = copy[$language];
</script>

<svelte:head>
  <title>{t.aboutPageTitle}</title>
</svelte:head>

<section class="content-page">
  <article class="content-card">
    {#if $language === "es"}
      <h1>Sobre Doccum</h1>
      <p>
        Doccum nace de una idea simple: dejar constancia verificable. El nombre se inspira en el latin
        <strong>documentum</strong>, que se usaba como prueba, demostracion o testimonio.
      </p>
      <p>
        Por eso no significa "doc y cum" separados: expresa una sola nocion de evidencia con contexto.
        En la practica, Doccum combina certificacion criptografica, sello temporal verificable y acceso por QR para
        que equipos legales, tecnicos y de compliance compartan una misma fuente de verdad.
      </p>
    {:else}
      <h1>About Doccum</h1>
      <p>
        Doccum starts from one idea: leave verifiable records. The name is inspired by the Latin word
        <strong>documentum</strong>, historically used as proof, demonstration, or testimony.
      </p>
      <p>
        It is not "doc" plus "cum" as separate pieces; it represents one concept of evidence with context.
        In practice, Doccum combines cryptographic certification, verifiable time evidence, and QR access so legal,
        technical, and compliance teams can work from the same source of truth.
      </p>
    {/if}
  </article>

  <article class="content-card">
    {#if $language === "es"}
      <h2>Doccum frente a otras soluciones</h2>
      <p>Existen distintas formas de acreditar la existencia de un documento. Esta tabla resume las diferencias clave:</p>
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th class="highlight-col">Doccum</th>
              <th>Notario digital</th>
              <th>Blockchain timestamping</th>
              <th>Adobe Sign</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Coste por certificado</td><td class="highlight-col">Gratis</td><td>15–50 €</td><td>Variable (gas fees)</td><td>Desde 12 €/mes</td></tr>
            <tr><td>Velocidad</td><td class="highlight-col">&lt; 1 segundo</td><td>Minutos a horas</td><td>Minutos (confirmaciones)</td><td>Segundos</td></tr>
            <tr><td>Privacidad</td><td class="highlight-col">Sin almacenar contenido</td><td>Custodia del documento</td><td>Hash publico en cadena</td><td>Custodia en la nube</td></tr>
            <tr><td>Verificacion independiente</td><td class="highlight-col">URL publica + QR</td><td>Via notaria</td><td>Explorer de la cadena</td><td>Portal Adobe</td></tr>
            <tr><td>Cadena de integridad</td><td class="highlight-col">Chain digest encadenado</td><td>No</td><td>Merkle tree</td><td>No</td></tr>
            <tr><td>Requiere cuenta</td><td class="highlight-col">No</td><td>Si</td><td>Wallet</td><td>Si</td></tr>
            <tr><td>Open source</td><td class="highlight-col">Si (GPL-3.0)</td><td>No</td><td>Parcial</td><td>No</td></tr>
          </tbody>
        </table>
      </div>
      <p class="hint">Doccum no reemplaza la fe publica notarial. Ofrece una capa de evidencia rapida, accesible y verificable para equipos que necesitan trazabilidad sin friccion.</p>
    {:else}
      <h2>Doccum vs other solutions</h2>
      <p>There are several ways to prove a document existed at a specific time. Here is how they compare:</p>
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th class="highlight-col">Doccum</th>
              <th>Digital notary</th>
              <th>Blockchain timestamping</th>
              <th>Adobe Sign</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Cost per certificate</td><td class="highlight-col">Free</td><td>€15–50</td><td>Variable (gas fees)</td><td>From €12/mo</td></tr>
            <tr><td>Speed</td><td class="highlight-col">&lt; 1 second</td><td>Minutes to hours</td><td>Minutes (confirmations)</td><td>Seconds</td></tr>
            <tr><td>Privacy</td><td class="highlight-col">Content never stored</td><td>Document custody</td><td>Public hash on-chain</td><td>Cloud custody</td></tr>
            <tr><td>Independent verification</td><td class="highlight-col">Public URL + QR</td><td>Via notary office</td><td>Chain explorer</td><td>Adobe portal</td></tr>
            <tr><td>Integrity chain</td><td class="highlight-col">Linked chain digest</td><td>No</td><td>Merkle tree</td><td>No</td></tr>
            <tr><td>Account required</td><td class="highlight-col">No</td><td>Yes</td><td>Wallet</td><td>Yes</td></tr>
            <tr><td>Open source</td><td class="highlight-col">Yes (GPL-3.0)</td><td>No</td><td>Partial</td><td>No</td></tr>
          </tbody>
        </table>
      </div>
      <p class="hint">Doccum does not replace notarial public faith. It provides a fast, accessible, and verifiable evidence layer for teams that need traceability without friction.</p>
    {/if}
  </article>
</section>
