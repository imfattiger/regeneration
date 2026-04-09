import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0qnheos2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skXdVD8nP4koo5HIeqjvLVCLMdM3IjahgcM9BU6QDh4kPJIiPULWpKaxdwmi6EP1go9pjmLAVau3ClBphVUFtZbZvaGnWJal0EWfQYs7B9qU000l0uVkYNELu0sm5bTuN7DGEVyfU1CLWenZGDteAPkmuRNo1sXT9AgH4qcNjEboLZNOzdUs",
  useCdn: false,
});

const descriptions = [
  {
    slug: "5-panel-cap-uptown-festival-84-jacket",
    en: `This jacket from Adidas carries a strong sense of vintage sportswear blended with urban street culture.

The full graphic illustration on the back made us think for quite some time about how it should be reinterpreted. In the end, we chose a full panel cap construction, allowing the illustrated fabric to be used to its fullest potential.

The garment was then carefully reconstructed, preserving adidas' iconic three-stripe element, extending from the brim all the way to the back of the cap. Balancing the graphic, color, and material composition.

The brim continues our soft foam structure, maintaining firmness while still allowing room for shaping and adjustment.

• Full Panel Construction — fully showcasing the illustrated fabric
• Reconstructed Stripes — adidas three-stripes extended from brim to back panel
• Brim Feature — soft foam structure with firmness and shapeability`,
  },
  {
    slug: "5-panel-cap-adidas-mesh-track-jacket",
    en: `Built from an Adidas mesh track jacket. Originally designed for breathability and movement, the mesh structure is fully reworked into the cap — bringing lightweight comfort and ventilation into a new form.

The iconic three stripes are reconfigured as part of the panel layout, creating a subtle rhythm across the cap while maintaining a clean, balanced look. The front logo is kept in its original placement, preserving the authenticity of the piece.

Lightweight, breathable, and easy to wear — a cap that feels natural, like it was always meant to exist.

• Full Mesh Construction — lightweight and highly breathable
• Three-Stripe Recomposition — stripes reworked into the cap's structure
• Lightweight Comfort Fit — easy, all-day wear`,
  },
  {
    slug: "5-panel-cap-the-north-face-bag",
    en: `Some materials aren't the problem. They're simply defined too clearly.

When an object is reduced to a single function, it gets confined to that role. What I care about is whether it can be rearranged.

This time, I kept the original woven texture and proportions — only the structure was adjusted. Deconstructed from a flat form and re-patterned, a material once meant to carry objects is now made to be worn.

The material didn't change. Its position did.

Sometimes, value isn't missing — it's just misplaced.

• Deconstruct first. Define later.
• Material unchanged. Position shifted.
• Function can be rewritten.`,
  },
  {
    slug: "5-panel-cap-columbia-fleece-jacket",
    en: `This fleece jacket didn't stand out when I found it — worn out and damaged in several places, it was nearly discarded. Usable fabric was scarce, but after circling around it a few times, I imagined a soft, fluffy cap coming back to life through my hands. That idea alone made me take it home.

The woven label was flipped to the outside, adding a subtle highlight to the muted color. A broken zipper pull was repositioned onto the stitch line as a functional detail, while the drawcord was directly reused from the original hem of the jacket — small choices that preserve traces of what it once was.

To make it more wearable year-round, I chose breathable mesh fabric for the lining. Now, it's no longer just a cold-season piece — it's ready to blend into everyday styling across all seasons.

• Breathable Lining — Lightweight mesh inside makes it suitable for all-year wear.
• Functional Details — External label, repurposed zipper pull, and original drawcord reimagined as unique accents.
• One of One — Handcrafted and unreproducible. A true one-off piece.`,
  },
  {
    slug: "5-panel-cap-tnf-gore-tex",
    en: `This cap is reworked from a The North Face jacket, and it's easily one of our favorite pieces to date. What was originally just a subtle black accent was intentionally amplified into the central visual element, becoming the key contrast of the entire design.

The fabric is GORE-TEX — while inherently waterproof, we chose not to apply full seam sealing in order to maintain comfort and harmony with the inner lining. Even so, it still delivers reliable urban-level functionality.

The adjustable drawcord design is also carried over, reinterpreted from the jacket's original hem, with the cord lock detail fully preserved. In many ways, this piece distills the essence of the jacket into a single cap — nothing wasted, everything reimagined.

• GORE-TEX Fabric — High-performance material offering wind and water resistance, built for dependable city function.
• Reimagined Contrast — Original black accent panels were exaggerated and repositioned as the main visual statement.
• One of One — Hand-cut and reassembled — no duplicates. This cap is truly one of a kind.`,
  },
  {
    slug: "5-panel-cap-tnf-dryvent",
    en: `This cap marks the final piece of the series (future designs will feature slight updates — I hope you'll enjoy them too). It's also my first attempt at a fully enclosed cap design — still adjustable, but with a more complete and structured silhouette.

Crafted from The North Face's DRYVENT fabric, often seen as a more accessible counterpart to GORE-TEX. It delivers excellent windproof and waterproof performance, without the premium price tag. To preserve its functionality, I even learned how to apply a waterproof layer by heat-sealing — while not perfect, it should achieve at least 80% of its intended performance.

Since a fully enclosed cap tends to lack breathability, I repurposed the original underarm ventilation zippers from the jacket, essentially creating a "window" for airflow. This not only improves comfort but also adds an unexpected design detail.

Note: due to the non-flat texture of the fabric, some natural overlapping seams will appear. Please avoid purchase if this is a concern.

• Full-cap design with a more structured silhouette, while still keeping adjustable flexibility.
• DRYVENT technology delivers windproof and waterproof performance comparable to GORE-TEX, with original seam-sealed craftsmanship.
• Ventilation zipper transplanted from the jacket's underarm, adding breathability and unique styling details.`,
  },
  {
    slug: "5-panel-cap-nike-90s-windbreaker",
    en: `Handcrafted from a Nike half-placket windbreaker, this 5-panel cap carries the rhythm of city sportswear in a stripped-down, repurposed form. The logo was already dyed when sourced — a design challenge that turned into a highlight. We chose to preserve it on the side panel, keeping it subtle but unmistakable.

The original chest pocket was reworked into the cap, offering a small, functional stash space — perfect for cash or a few cigarettes on the move. The ventilation panel from the jacket's back was also kept and repositioned at the crown, adding breathability while nodding to its origins.

• Front chest pocket transformed into stash storage
• Back vent relocated to the crown for breathability
• One-of-one handmade construction — cannot be reproduced`,
  },
  {
    slug: "5-panel-cap-regeneration-handmade-001",
    en: `From the same batch of materials gathered for the previous piece, we once again brought them back to life — because value is always defined by us.`,
  },
  {
    slug: "5-panel-cap-nike-football-club",
    en: `The long-requested "all-black" caps are finally here — released as a double drop.

Compared to colorful or mixed materials, working with black requires much more intention. With a single tone, balance and proportion become critical, which is why the concept was already defined before sourcing the materials.

This time, we chose to fully preserve the oversized back logo, allowing it to extend across the cap as a structural visual element rather than a simple accent — subtle, yet unmistakable.

The multilingual neck label is intentionally retained, letting information become part of the design. Quiet at first glance, but rich in detail up close.

A half-soft, half-firm brim maintains structure while allowing styling flexibility. Finished with water-repellent nylon and subtle reflective details, the cap works effortlessly for both daily wear and active settings.

• Oversized Logo Integration — The original oversized logo is fully preserved and reworked as the cap's main visual element — subtle yet highly recognizable.
• Half-Soft Brim Construction — A balanced brim structure that maintains shape while allowing flexibility and styling freedom.
• Water-Repellent Nylon with Reflective Details — Durable water-repellent nylon finished with subtle reflective accents for everyday wear and nighttime visibility.`,
  },
  {
    slug: "5-panel-cap-nike-marathon-sport",
    en: `Running may be the foundation of all sports. And the marathon is what makes running truly great.

This cap is derived from a Nike Marathon runner's jacket. Clean, streamlined lines paired with reflective detailing ensure visibility and safety — even on a 42-kilometer journey home. We reworked the original lines to preserve their aerodynamic flow while introducing new visual cues for nightlife, allowing performance-driven design to exist beyond the track.

The iconic runner logo is fully retained on the crown, serving as a reminder of where you came from and who you run for. A subtle embroidered label is hidden within the details — quiet, understated, and recognizable only to those who know.

The brim features a newly developed material, balanced between soft and firm, offering structure without sacrificing flexibility or styling potential. A fully enclosed cap construction brings together functionality and fashion, delivering stability with a clear attitude.

• Fully enclosed cap structure — complete coverage where function meets form.
• Balanced soft–firm brim — supportive yet flexible, enhancing styling versatility.
• Reflective line details — performance elements adapted from runner gear to improve nighttime visibility.`,
  },
];

async function updateDescriptions() {
  for (const item of descriptions) {
    const docs = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{ _id }`,
      { slug: item.slug }
    );

    if (!docs?._id) {
      console.log(`✗ 找不到: ${item.slug}`);
      continue;
    }

    await client.patch(docs._id).set({
      "description.en": item.en,
    }).commit();

    console.log(`✓ ${item.slug}`);
  }
  console.log("\n完成！");
}

updateDescriptions().catch(console.error);
