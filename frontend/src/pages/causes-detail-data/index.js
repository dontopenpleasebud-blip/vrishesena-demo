// Registry of dynamic causes
export const causesRegistry = {
  'banana_milk': () => import('./banana_milk.js'),
  'banana_milk': () => import('./banana_milk.js'),
  'bicycle': () => import('./bicycle.js'),
  'bicycle': () => import('./bicycle.js'),
  'bihar_kit': () => import('./bihar_kit.js'),
  'bihar_kit': () => import('./bihar_kit.js'),
  'bird_house': () => import('./bird_house.js'),
  'bird_house': () => import('./bird_house.js'),
  'birthday_cake': () => import('./birthday_cake.js'),
  'birthday_cake': () => import('./birthday_cake.js'),
  'blanket': () => import('./blanket.js'),
  'blanket': () => import('./blanket.js'),
  'chicken_briyani': () => import('./chicken_briyani.js'),
  'chicken_briyani': () => import('./chicken_briyani.js'),
  'childcare_kit': () => import('./childcare_kit.js'),
  'childcare_kit': () => import('./childcare_kit.js'),
  'child_education': () => import('./child_education.js'),
  'child_education': () => import('./child_education.js'),
  'child_gift': () => import('./child_gift.js'),
  'child_gift': () => import('./child_gift.js'),
  'egg_briyani': () => import('./egg_briyani.js'),
  'egg_briyani': () => import('./egg_briyani.js'),
  'grocery_kit': () => import('./grocery_kit.js'),
  'grocery_kit': () => import('./grocery_kit.js'),
  'hearing_aid': () => import('./hearing_aid.js'),
  'hearing_aid': () => import('./hearing_aid.js'),
  'hygiene_kit': () => import('./hygiene_kit.js'),
  'hygiene_kit': () => import('./hygiene_kit.js'),
  'induction_stove': () => import('./Induction_Stove.js'),
  'Induction_Stove': () => import('./Induction_Stove.js'),
  'mosquito_net': () => import('./mosquito_net.js'),
  'mosquito_net': () => import('./mosquito_net.js'),
  'mother_kit': () => import('./mother_kit.js'),
  'mother_kit': () => import('./mother_kit.js'),
  'napkin': () => import('./napkin.js'),
  'napkin': () => import('./napkin.js'),
  'nepal_house': () => import('./nepal_house.js'),
  'nepal_house': () => import('./nepal_house.js'),
  'plant_tree': () => import('./plant_tree.js'),
  'plant_tree': () => import('./plant_tree.js'),
  'school_bag': () => import('./school_bag.js'),
  'school_bag': () => import('./school_bag.js'),
  'slipper': () => import('./slipper.js'),
  'slipper': () => import('./slipper.js'),
  'tailoring_machine': () => import('./tailoring_machine.js'),
  'tailoring_machine': () => import('./tailoring_machine.js'),
  'thaali': () => import('./thaali.js'),
  'thaali': () => import('./thaali.js'),
  'transgender_kit': () => import('./transgender_kit.js'),
  'transgender_kit': () => import('./transgender_kit.js'),
  'veg_briyani': () => import('./veg_briyani.js'),
  'veg_briyani': () => import('./veg_briyani.js'),
  'virtual_birthday_cake': () => import('./virtual_birthday_cake.js'),
  'virtual_birthday_cake': () => import('./virtual_birthday_cake.js'),
  'water_bottle': () => import('./water_bottle.js'),
  'water_bottle': () => import('./water_bottle.js'),
  'water_bowl': () => import('./water_bowl.js'),
  'water_bowl': () => import('./water_bowl.js'),
  'wheel_chair': () => import('./wheel_chair.js'),
  'wheel_chair': () => import('./wheel_chair.js'),
};

export const isCauseAvailable = (slug) => {
  if (!slug) return false;
  const key = slug.toLowerCase();
  return !!causesRegistry[key];
};

export const loadCauseData = async (slug) => {
  if (!slug) return null;
  const key = slug.toLowerCase();
  const loader = causesRegistry[key] || causesRegistry[slug];
  if (!loader) return null;
  return await loader();
};
