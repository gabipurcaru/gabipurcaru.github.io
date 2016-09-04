package main

import (
	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/css"
	"github.com/tdewolff/minify/html"
	"github.com/tdewolff/minify/js"
	"io/ioutil"
	"strings"
)

func main() {
	indexBytes, err := ioutil.ReadFile("index.html")
	if err != nil {
		panic(err)
	}

	indexStr := string(indexBytes)

	cssBytes, err := ioutil.ReadFile("style.css")
	if err != nil {
		panic(err)
	}

	cssStr := string(cssBytes)

	jsBytes, err := ioutil.ReadFile("script.js")
	if err != nil {
		panic(err)
	}

	jsStr := string(jsBytes)

	bundle := strings.Replace(
		indexStr,
		"<!-- CSS -->",
		"<style>"+cssStr+"</style>",
		1,
	)
	bundle = strings.Replace(
		bundle,
		"<!-- JS -->",
		"<script>"+jsStr+"</script>",
		1,
	)

	m := minify.New()
	m.AddFunc("text/css", css.Minify)
	m.AddFunc("text/html", html.Minify)
	m.AddFunc("text/javascript", js.Minify)

	minifiedBundle, err := m.String("text/html", bundle)
	if err != nil {
		panic(err)
	}

	commentBytes, err := ioutil.ReadFile("comment.html")
	if err != nil {
		panic(err)
	}

	commentStr := string(commentBytes)

	minifiedBundle = strings.Replace(
		minifiedBundle,
		"<!doctype html>",
		"<!doctype html>\n"+commentStr,
		1,
	)

	ioutil.WriteFile("bundle.html", []byte(minifiedBundle), 0660)
}
