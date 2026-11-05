import test from "node:test";
import assert from "node:assert/strict";
import { createKeyboardScene } from "./scene";
import { SKILLS, SkillNames } from "@/data/constants";

test("Keyboard scene creates bilingual labels for default prompt", () => {
  const skills = [
    {
      ...SKILLS[SkillNames.TAILWIND],
      icon: SKILLS[SkillNames.TAILWIND].keyboardIcon ?? SKILLS[SkillNames.TAILWIND].icon,
    },
  ];
  const scene = createKeyboardScene(skills, 1);

  assert.ok(scene.defaultLabelId, "English defaultLabelId exists");
  assert.ok(scene.defaultLabelIdZh, "Chinese defaultLabelIdZh exists");
  assert.notEqual(scene.defaultLabelId, scene.defaultLabelIdZh, "Default labels must be distinct");

  const enDefaultNode = scene.document.nodes[scene.defaultLabelId];
  const zhDefaultNode = scene.document.nodes[scene.defaultLabelIdZh];
  assert.ok(enDefaultNode, "EN default node exists in scene");
  assert.ok(zhDefaultNode, "ZH default node exists in scene");
});

test("Keyboard scene creates English and Chinese labels for every skill key", () => {
  const skills = Object.values(SKILLS).map((skill) => ({
    ...skill,
    icon: skill.keyboardIcon ?? skill.icon,
  }));
  const scene = createKeyboardScene(skills, 6);

  assert.equal(scene.keys.length, skills.length);

  for (const key of scene.keys) {
    assert.ok(key.labelId, `Key ${key.skill.name} has EN labelId`);
    assert.ok(key.labelIdZh, `Key ${key.skill.name} has ZH labelIdZh`);
    assert.notEqual(key.labelId, key.labelIdZh, `Labels for ${key.skill.name} must be distinct`);

    const enNode = scene.document.nodes[key.labelId];
    const zhNode = scene.document.nodes[key.labelIdZh];
    assert.ok(enNode, `EN node exists for ${key.skill.name}`);
    assert.ok(zhNode, `ZH node exists for ${key.skill.name}`);
  }

  // Check Tailwind specifically (the one in the user screenshot)
  const tailwindKey = scene.keys.find((k) => k.skill.name === "tailwind");
  assert.ok(tailwindKey, "Tailwind key found");

  const zhLabelGroup = scene.document.nodes[tailwindKey.labelIdZh];
  assert.ok(zhLabelGroup, "Tailwind ZH group exists");

  // Find the description mesh in the Tailwind ZH label group
  const descChildId = zhLabelGroup.children.find((childId) => {
    const node = scene.document.nodes[childId];
    return node.name.startsWith("Description");
  });
  assert.ok(descChildId, "Description mesh exists in ZH label group");

  const descNode = scene.document.nodes[descChildId!];
  assert.equal(descNode.type, "mesh");
  const materialId = (descNode as { materialId: string }).materialId;
  assert.ok(materialId, "Material ID exists on mesh");

  const material = scene.document.materials[materialId];
  assert.ok(material, "Material exists");
  const assetId = material.maps.map;
  assert.ok(assetId, "Texture map asset exists on description material");

  const asset = scene.document.assets[assetId!];
  assert.ok(asset.name.startsWith("data:image/svg+xml"), "Texture is an SVG data URL");

  // Decode SVG content from data URL
  const svgContent = decodeURIComponent(asset.name.replace("data:image/svg+xml,", ""));
  // Expected Chinese description for Tailwind: "原子化样式直接起飞，手感丝滑到上头"
  assert.match(svgContent, /原子化样式直接起飞/);
});
