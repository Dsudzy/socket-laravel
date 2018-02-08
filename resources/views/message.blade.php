@extends('layouts.app')
@section('content')
    <section class="row">
        <div class="columns medium-8">
        </div>
        <div class="columns medium-4">
            <chat-section :room="'{{ $room }}'"></chat-section>
        </div>
    </section>
@endsection