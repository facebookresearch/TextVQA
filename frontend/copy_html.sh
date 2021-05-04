#!/bin/bash

routes=(leaderboard faq login tasks diagnostics)

declare -a routes=("textcaps" "textcaps/download" "textcaps/challenge" "textcaps/explore" "textcaps/dataset" "dataset" "challenge" "download" "explore")

cd build

for i in "${routes[@]}"
do
	rm -r $i
	mkdir -p $i
	cp index.html $i
done;

cd ..

