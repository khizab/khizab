import { onMounted, ref } from "vue";

type Sponsor = {
  name: string;
  img: string;
  url: string;
};

type Data = {
  size: "big" | "medium" | "small";
  items: Sponsor[];
  tier: string;
  type: "platinum" | "gold" | "silver";
}[];

// shared data across instances so we load only once.
const data = ref<Data>();

// TODO: Data powered
// const dataHost = 'https://sponsors.vuejs.org'
// const dataUrl = `${dataHost}/vite.json`

export function useSponsors() {
  onMounted(async () => {
    if (data.value) return;

    // const result = await fetch(dataUrl)
    // const json = await result.json()
    // console.log(json)
    const sponsors = {
      platinum: [],
      gold: [],
      silver: [],
    };

    data.value = mapSponsors(sponsors);
  });

  return { data };
}

function mapSponsors(sponsors: {
  platinum: Sponsor[];
  gold: Sponsor[];
  silver: Sponsor[];
}) {
  return [
    {
      size: "big",
      items: mapImgPath(sponsors.platinum),
      tier: "Collaborators",
      type: "platinum",
    },
    {
      size: "medium",
      items: mapImgPath(sponsors.gold),
      tier: "Large Enterprises",
      type: "gold",
    },
    {
      size: "small",
      items: mapImgPath(sponsors.silver),
      tier: "Small Enterprises",
      type: "silver",
    },
  ] satisfies Data;
}

function mapImgPath(sponsors: Sponsor[]) {
  return sponsors.map((sponsor) => ({
    ...sponsor,
    img: `https://raw.githubusercontent.com/khizab/.github/main/content/sponsors/${sponsor.img}`,
  }));
}
