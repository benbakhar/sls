#!/usr/bin/env node

import program from "commander";
import { nineClubApi, worldTourApi } from "../lib/api";

program
  .name("sls")
  .usage("[command] [options]");

program
  .command("world-tour")
  .description("list current sls world tour")
  .alias("wt")
  // #TODO impl
  .option("-o, --output <output>", "output format type", "json")
  .action(async (_) => {
    const result = await worldTourApi.get();

    console.log(result);
  });

program
  .command("nine-club")
  .description("list all nine club members")
  .alias("nc")
  .option("-l, --limit <number>", "list only top <number> scores", -1)
  .option("-s, --skater <name>", "list 9 ckub scores by skater")
  .action(async ({ limit, skater }) => {
    const response = await nineClubApi.get({ limit, skater });

    console.log(response);
  });

program.parse(process.argv);
